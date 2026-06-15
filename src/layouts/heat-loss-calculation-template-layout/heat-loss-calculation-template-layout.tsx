import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetHeatLossCalculationItemMutation } from '../../store';
import { heatLossCalculationItemSelector, setHeatLossCalculation } from '../../store/slices/heat-loss-calculation-slice';
import HeatLossCalculationTemplate from './heat-loss-calculation-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function HeatLossCalculationTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getHeatLossCalculationItem] = useGetHeatLossCalculationItemMutation();
  const item = useAppSelector(heatLossCalculationItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getHeatLossCalculationItem(+id).unwrap();
        dispatch(setHeatLossCalculation({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.heatLossCalculation}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <HeatLossCalculationTemplate
              data={item!.heatLossCalculation!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

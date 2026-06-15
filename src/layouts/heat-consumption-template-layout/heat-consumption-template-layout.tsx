import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetHeatConsumptionItemMutation } from '../../store';
import { heatConsumptionItemSelector, setHeatConsumption } from '../../store/slices/heat-consumption-slice';
import HeatConsumptionTemplate from './heat-consumption-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function HeatConsumptionLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getHeatConsumptionItem] = useGetHeatConsumptionItemMutation();
  const item = useAppSelector(heatConsumptionItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getHeatConsumptionItem(+id).unwrap();
        dispatch(setHeatConsumption({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.heatConsumption}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <HeatConsumptionTemplate
              data={item!.heatConsumption!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

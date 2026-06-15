import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetCalculationMeterItemMutation } from '../../store';
import { calculationMeterItemSelector, setCalculationMeter } from '../../store/slices/calculation-meter-slice';
import CalculationMeterTemplate from './calculation-meter-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function CalculationMeterTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getCalculationMeterItem] = useGetCalculationMeterItemMutation();
  const item = useAppSelector(calculationMeterItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getCalculationMeterItem(+id).unwrap();
        dispatch(setCalculationMeter({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.calculationMeter}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <CalculationMeterTemplate
              data={item!.calculationMeter!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

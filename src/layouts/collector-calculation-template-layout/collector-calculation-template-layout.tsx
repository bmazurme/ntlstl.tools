import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetCollectorCalculationItemMutation } from '../../store';
import { collectorCalculationItemSelector, setCollectorCalculation } from '../../store/slices/collector-calculation-slice';
import CollectorCalculationTemplate from './collector-calculation-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function CollectorCalculationTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getCollectorCalculationItem] = useGetCollectorCalculationItemMutation();
  const item = useAppSelector(collectorCalculationItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getCollectorCalculationItem(+id).unwrap();
        dispatch(setCollectorCalculation({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.collectorCalculation}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <CollectorCalculationTemplate
              data={item!.collectorCalculation!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

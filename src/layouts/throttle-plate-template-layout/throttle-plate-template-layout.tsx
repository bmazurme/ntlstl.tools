import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetThrottlePlateItemMutation } from '../../store';
import { throttlePlateItemSelector, setThrottlePlate } from '../../store/slices/throttle-plate-slice';
import ThrottlePlateTemplate from './throttle-plate-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function ThrottlePlateTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getThrottlePlateItem] = useGetThrottlePlateItemMutation();
  const item = useAppSelector(throttlePlateItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getThrottlePlateItem(+id).unwrap();
        dispatch(setThrottlePlate({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.throttlePlate}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <ThrottlePlateTemplate
              data={item!.throttlePlate!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

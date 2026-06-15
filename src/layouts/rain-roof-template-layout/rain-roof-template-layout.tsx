import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { useGetRainRoofsItemMutation } from '../../store';
import { rainRoofsItemSelector, setRainRoofs } from '../../store/slices/rain-roofs-slice';
import RainRoofTemplate from './rain-roof-template';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function RainRoofTemplateLayout() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getRainRoofItem] = useGetRainRoofsItemMutation();
  const item = useAppSelector(rainRoofsItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getRainRoofItem(+id).unwrap();
        dispatch(setRainRoofs({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.rainRoof}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <RainRoofTemplate
              data={item!.rainRoof!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

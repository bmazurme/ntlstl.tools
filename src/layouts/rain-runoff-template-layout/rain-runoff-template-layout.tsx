import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateWrapper from '../../components/template-wrapper/template-wrapper';
import ExportPdfButton from '../../components/export-pdf-button';

import RainRunoffTemplate from './rain-runoff-template';
import { rainRunoffsItemSelector, setRainRunOffs, useGetRainRunoffsItemMutation } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useAppToaster from '../../hooks/use-app-toaster';
import { isValidItemId } from '../../utils/is-valid-item-id';

export default function RainRunoffDetailPage() {
  const dispatch = useAppDispatch();
  const { showError } = useAppToaster();
  const { itemId } = useParams<{ itemId: string }>();
  const [getRainRunoffsItem] = useGetRainRunoffsItemMutation();
  const item = useAppSelector(rainRunoffsItemSelector);

  useEffect(() => {
    if (!isValidItemId(itemId)) {
      showError(`Invalid itemId: ${itemId}`, 'Ошибка');
      return;
    }

    const fetchData = async (id: string) => {
      try {
        const data = await getRainRunoffsItem(+id).unwrap();
        dispatch(setRainRunOffs({ item: data }));
      } catch (error) {
        showError(error, 'Ошибка');
      }
    };

    fetchData(itemId);
  }, [itemId]);

  return (
    <TemplateWrapper isLoading={!item?.rainRunoff}>
      {() => (
        <>
          <ExportPdfButton />
          <div className="printable">
            <RainRunoffTemplate
              data={item!.rainRunoff!}
              title={item!.name}
            />
          </div>
        </>
      )}
    </TemplateWrapper>
  );
}

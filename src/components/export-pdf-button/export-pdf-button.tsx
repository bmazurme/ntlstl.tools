import { useCallback } from 'react';
import { Button, Icon } from '@gravity-ui/uikit';
import { FileArrowDown } from '@gravity-ui/icons';

import style from './export-pdf-button.module.css';

export default function ExportPdfButton() {
  const handleExportPdf = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className={`${style.header} no-print`}>
      <Button
        view="action"
        size="m"
        onClick={handleExportPdf}
      >
        <Icon
          data={FileArrowDown}
          size={18}
        />
        Экспорт в PDF
      </Button>
    </div>
  );
}

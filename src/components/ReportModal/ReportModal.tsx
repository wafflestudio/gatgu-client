import React, { useState } from 'react';

import { Modal, Select, TextArea } from 'native-base';

import { palette } from '@/styles';

import { GModal } from '../Gatgu';
import { GButton } from '../Gatgu/GButton';

interface IReportModalProps {
  reasons: string[];
  submitting?: boolean;
  onHide: () => void;
  onSubmit: (content: string) => void;
}

const ReportModal: React.FC<IReportModalProps> = ({
  reasons,
  submitting,
  onHide,
  onSubmit,
}) => {
  const [reportType, setReportType] = useState<string>();
  const [reportContent, setReportContent] = useState<string>();

  const handleSubmit = () => {
    onSubmit(JSON.stringify({ reportType, reportContent }));
  };

  return (
    <GModal avoidKeyboard closeOnOverlayClick={false} onClose={onHide}>
      <GModal.Header>신고하기</GModal.Header>

      <Modal.Body height="100%">
        <Select
          placeholder="신고 항목"
          selectedValue={reportType}
          onValueChange={setReportType}
          marginBottom="30px"
        >
          {reasons.map((reason) => (
            <Select.Item key={reason} value={reason} label={reason} />
          ))}
        </Select>

        <TextArea
          _focus={{ borderColor: palette.blue }}
          placeholder="신고 이유를 적어주세요"
          value={reportContent}
          maxLength={1000}
          maxHeight={205}
          onChangeText={setReportContent}
        />
      </Modal.Body>
      <GModal.Footer>
        <GButton
          disabled={reportType === undefined}
          isLoading={submitting}
          onPress={handleSubmit}
        >
          제출하기
        </GButton>
      </GModal.Footer>
    </GModal>
  );
};

export default ReportModal;

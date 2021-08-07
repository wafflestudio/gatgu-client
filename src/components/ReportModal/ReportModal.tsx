import React, { useState } from 'react';
import { Text } from 'react-native';

import { Modal, Select, TextArea } from 'native-base';

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
    <Modal isOpen size="lg" avoidKeyboard onClose={onHide}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>신고하기</Modal.Header>

        <Modal.Body height="100%">
          <Text> </Text>

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
            placeholder="신고 이유를 적어주세요"
            value={reportContent}
            maxLength={1000}
            height="100%"
            onChangeText={setReportContent}
          />
        </Modal.Body>

        <Modal.Footer>
          <GButton
            disabled={reportType === undefined}
            isLoading={submitting}
            onPress={handleSubmit}
          >
            제출하기
          </GButton>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ReportModal;

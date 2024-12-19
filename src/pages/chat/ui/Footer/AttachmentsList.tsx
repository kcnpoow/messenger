import { Image, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ImagePickerAsset } from 'expo-image-picker';

import { Container, Col } from '@/src/shared/ui/layout';

type AttachmentsListProps = {
  attachments: ImagePickerAsset[];
};

export const AttachmentsList = ({ attachments }: AttachmentsListProps) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={{
        paddingVertical: 16,
        backgroundColor: theme.colors.surfaceVariant,
      }}
      horizontal
    >
      <Container
        style={{
          flexDirection: 'row',
          columnGap: 16,
        }}
      >
        {attachments.map((attachment, index) => (
          <Col width={64} height={64} key={index}>
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: attachment.uri }}
            />
          </Col>
        ))}
      </Container>
    </ScrollView>
  );
};

import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';

import { Attachment } from '@/src/entities/message';

type AttachmentsProps = {
  attachments: Attachment[];
};

export const Attachments = ({ attachments }: AttachmentsProps) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ marginTop: 16, rowGap: 8 }}>
      {attachments.map((attachment, index) => (
        <Image
          key={index}
          style={{
            width: width * 0.3,
            aspectRatio: attachment.width / attachment.height,
          }}
          source={{ uri: attachment.url }}
        />
      ))}
    </View>
  );
};

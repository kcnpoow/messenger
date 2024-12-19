import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, useTheme, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchImageLibraryAsync, ImagePickerAsset } from 'expo-image-picker';

import { AttachmentsList } from './AttachmentsList';
import { updateConversation } from '@/src/entities/conversation';
import {
  createMessage,
  Attachment,
} from '@/src/entities/message';
import { Container, Row, Col } from '@/src/shared/ui/layout';
import { useAuth } from '@/src/shared/hooks/useAuth';
import { bs } from '@/src/shared/api/bytescale';

type FooterProps = {
  companionId: string;
  conversationId: string;
};

export const Footer = ({ companionId, conversationId }: FooterProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<ImagePickerAsset[]>([]);
  const [isAttachmentsUploading, setIsAttachmentsUploading] = useState(false);

  const handleAttachmentsPress = async () => {
    const images = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      base64: true,
    });

    if (images.assets) {
      setAttachments(images.assets);
    }
  };

  const handleSendPress = async () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage === '') {
      return;
    }

    try {
      let uploadedFiles: Attachment[] = [];
      if (attachments.length > 0) {
        setIsAttachmentsUploading(true);

        uploadedFiles = await bs.uploadImages(attachments);
      }

      setMessage('');
      setAttachments([]);

      const createdMessage = await createMessage(
        conversationId,
        user!.id,
        trimmedMessage,
        uploadedFiles
      );

      updateConversation(
        user!.id,
        companionId,
        conversationId,
        createdMessage.id,
        createdMessage.senderId,
        createdMessage.content,
        createdMessage.timestamp
      );
    } finally {
      setIsAttachmentsUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {attachments.length > 0 && <AttachmentsList attachments={attachments} />}

      <Container
        style={{
          paddingTop: 5,
          paddingBottom: 5 + insets.bottom,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Row alignItems='center'>
          <Col>
            {attachments.length === 0 ? (
              <IconButton
                style={{ marginLeft: -9 }}
                icon='attachment'
                size={25}
                onPress={handleAttachmentsPress}
              />
            ) : (
              <IconButton
                style={{ marginLeft: -9 }}
                icon='cancel'
                size={25}
                disabled={isAttachmentsUploading}
                onPress={() => setAttachments([])}
              />
            )}
          </Col>
          <Col flex={1}>
            <TextInput
              style={{
                height: 50,
                backgroundColor: theme.colors.elevation.level2,
              }}
              outlineStyle={{ borderWidth: 0, borderRadius: 100 }}
              mode='outlined'
              placeholder='Message'
              blurOnSubmit={false}
              disabled={isAttachmentsUploading}
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={handleSendPress}
            />
          </Col>
          <Col>
            <IconButton
              style={{ marginRight: -9 }}
              icon='send'
              size={25}
              disabled={isAttachmentsUploading}
              loading={isAttachmentsUploading}
              onPress={handleSendPress}
            />
          </Col>
        </Row>
      </Container>
    </KeyboardAvoidingView>
  );
};

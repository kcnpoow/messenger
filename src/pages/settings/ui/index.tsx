import { signOut } from 'firebase/auth';
import { Switch, Text, Button } from 'react-native-paper';

import { Container, Row, Col } from '@/src/shared/ui/layout';
import { usePreferences } from '@/src/shared/hooks/usePreferences';
import { auth } from '@/src/shared/config/firebase';

export const Settings = () => {
  const { isThemeDark, toggleTheme } = usePreferences();

  return (
    <Container style={{ rowGap: 32 }}>
      <Row alignItems='center'>
        <Col flex={1}>
          <Text>Dark Theme</Text>
        </Col>
        <Col>
          <Switch value={isThemeDark} onValueChange={toggleTheme} />
        </Col>
      </Row>

      <Row alignItems='center'>
        <Col flex={1}>
          <Text>Sign Out</Text>
        </Col>
        <Col>
          <Button mode='contained' onPress={() => signOut(auth)}>
            Log Out
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

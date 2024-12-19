import { useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { TextInput, HelperText, Button, Text } from 'react-native-paper';

import { GeneralError } from './GeneralError';
import { Prompt } from './Prompt';
import { Container } from '@/src/shared/ui/layout';
import { auth } from '@/src/shared/config/firebase';

const initialFormData = {
  email: '',
  password: '',
};

const initialErrors = {
  email: '',
  password: '',
  general: '',
};

export const SignIn = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
    setErrors((prevState) => ({ ...prevState, general: '', [field]: '' }));
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!formData.email) {
      setErrors((prevState) => ({ ...prevState, email: 'Email is required' }));

      isValid = false;
    }

    if (!formData.password) {
      setErrors((prevState) => ({
        ...prevState,
        password: 'Password is required',
      }));

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (
          error.code === AuthErrorCodes.INVALID_EMAIL ||
          error.code === AuthErrorCodes.INVALID_PASSWORD ||
          error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: 'Invalid email or password',
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Error',
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ flex: 1, justifyContent: 'center' }}>
      <Text
        style={{ marginBottom: 32, textAlign: 'center' }}
        variant='headlineLarge'
      >
        Sign In
      </Text>

      <TextInput
        mode='outlined'
        label='Email'
        disabled={isLoading}
        value={formData.email}
        autoCapitalize='none'
        onChangeText={(text) => handleChange('email', text)}
      />
      <HelperText type='error'>{errors.email || ' '}</HelperText>

      <TextInput
        mode='outlined'
        label='Password'
        secureTextEntry
        autoCapitalize='none'
        disabled={isLoading}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <HelperText type='error'>{errors.password || ' '}</HelperText>

      {errors.general !== '' && <GeneralError error={errors.general} />}

      <Button mode='contained' loading={isLoading} onPress={handleSubmit}>
        Login
      </Button>

      <Prompt
        promptText="Don't have an account? "
        linkText='Sign Up'
        onLinkPress={() => navigation.dispatch(StackActions.replace('SignUp'))}
      />
    </Container>
  );
};

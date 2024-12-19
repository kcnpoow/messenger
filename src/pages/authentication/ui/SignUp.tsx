import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Text, TextInput, HelperText, Button } from 'react-native-paper';

import { Prompt } from './Prompt';
import { createUser } from '@/src/entities/user';
import { Container, Row, Col } from '@/src/shared/ui/layout';
import { auth } from '@/src/shared/config/firebase';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  general: '',
};

export const SignUp = () => {
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

    if (!formData.firstName) {
      setErrors((prevState) => ({
        ...prevState,
        firstName: 'First Fame is required',
      }));

      isValid = false;
    }

    if (!formData.lastName) {
      setErrors((prevState) => ({
        ...prevState,
        lastName: 'Last Name is required',
      }));

      isValid = false;
    }

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await createUser(
        userCredential.user.uid,
        formData.firstName,
        formData.lastName
      );
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Invalid email',
          }));
        }

        if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: 'Password should be at least 6 characters',
          }));
        }

        if (error.code === 'auth/email-already-in-use') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email is already in use',
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
        Sign Up
      </Text>

      <Row columnGap={16}>
        <Col flex={1}>
          <TextInput
            mode='outlined'
            label='First Name'
            disabled={isLoading}
            value={formData.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
          <HelperText type='error'>{errors.firstName || ' '}</HelperText>
        </Col>
        <Col flex={1}>
          <TextInput
            mode='outlined'
            label='Last Name'
            disabled={isLoading}
            value={formData.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />
          <HelperText type='error'>{errors.lastName || ' '}</HelperText>
        </Col>
      </Row>

      <TextInput
        mode='outlined'
        label='Email'
        disabled={isLoading}
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <HelperText type='error'>{errors.email || ' '}</HelperText>

      <TextInput
        mode='outlined'
        label='Password'
        secureTextEntry
        disabled={isLoading}
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <HelperText type='error'>{errors.password || ' '}</HelperText>

      <Button mode='contained' loading={isLoading} onPress={handleSubmit}>
        Register
      </Button>

      <Prompt
        promptText='Already have an account? '
        linkText='Sign In'
        onLinkPress={() => navigation.dispatch(StackActions.replace('SignIn'))}
      />
    </Container>
  );
};

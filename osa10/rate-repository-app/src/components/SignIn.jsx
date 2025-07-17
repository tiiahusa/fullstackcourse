import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.listBackground,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    margin: theme.spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: theme.fontSizes.body,
    backgroundColor: theme.colors.inputBackground,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
  },
  button: {
    backgroundColor: theme.colors.btnBackgroud,
    paddingVertical: theme.buttons.primary.paddingVertical,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
  },
});

const initialValues = {
  name: '',
  pass: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Username must be 3 characters length')
    .required('Username is required'),
  pass: yup
    .string()
    .min(5, 'Password must be 5 characters length')
    .required('Password is required'),
});

const SignInForm = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const nameHasError = formik.touched.name && formik.errors.name;
  const passHasError = formik.touched.pass && formik.errors.pass;

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, nameHasError && styles.inputError]}
        placeholder="Username"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      {nameHasError && (
        <Text style={styles.errorText}>{formik.errors.name}</Text>
      )}
      <TextInput
        style={[styles.input, passHasError && styles.inputError]}
        placeholder="Password"
        value={formik.values.pass}
        secureTextEntry={true}
        onChangeText={formik.handleChange('pass')}
      />
      {passHasError && (
        <Text style={styles.errorText}>{formik.errors.pass}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
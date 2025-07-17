import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const initialValues = {
  name: '',
  pass: '',
};

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
  button: {
    backgroundColor: theme.colors.btnBackgroud,
    paddingVertical: theme.buttons.primary.paddingVertical,
    borderRadius: theme.borderRadius.small,
    alignItems: 'center',
  },
});

const SignInForm = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  })
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.pass}
        secureTextEntry={true}
        onChangeText={formik.handleChange('pass')}
      />
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
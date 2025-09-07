import { UserSchema, UserSchemaV2 } from "~/validations/user";

// data that could come from some api
const userData = {
  name: 'Elias',
  age: 27,
  email: 'eestrabao46@gmail.com'
};

// basic example abot how to validate data
const result = UserSchema.safeParse(userData);

if (result.success) {
  // console to check, if the data okay according to the 
  // validation, we can go with the app flow.
  console.log(result.data);
} else {
  // here, if we have some problem with data me could handle it here
  console.log(result.error);
}

// invalid data example
const invalidUserData = {
  name: 'Al', // Too short
  age: -5, // Negative age
  email: 'not-an-email', // Invalid email format
  password: '123', // Too short
};

const resultV2 = UserSchemaV2.safeParse(userData);

if (resultV2.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}
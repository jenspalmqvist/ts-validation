{
  type Person = {
    name: string;
    age: number;
    address: {
      street: string;
      zipcode: number;
      city: string;
      country: string;
    };
    email?: string;
    phone?: string;
    shoeSize?: number;
  };

  const getPersonInfo = () => {
    return JSON.parse(
      `{"name":2,"age":37,"address":{"street":"Gatanvägen 32","zipCode":12345,"city":"Storstaden","country":"Sweden"},"email":"jens@jens.se","phone":"0701234567","shoeSize":42,"secretNuclearCode":"Qwerty1234!"}`
    );
  };

  const writePersonToPublicDatabase = (person: Person) => {
    console.log(person);
  };

  const isValidString = (
    str: unknown,
    minLength: number,
    maxLength: number
  ): boolean => {
    if (
      typeof str == "string" &&
      str.length > minLength &&
      str.length < maxLength
    ) {
      return true;
    }
    return false;
  };
  const validation = () => {
    const person: Person = getPersonInfo();

    const safePerson: Person = {
      name: person.name,
      age: person.age,
      address: person.address,
      email: person.email,
      phone: person.phone,
      shoeSize: person.shoeSize,
    };

    console.log(safePerson);
    if (!isValidString(person.name, 2, 30)) {
      throw Error("Invalid or missing name");
    }
  };

  validation();
}

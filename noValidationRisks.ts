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
      `{"name":"Jens","age":37,"address":{"street":"Gatanvägen 32","zipCode":12345,"city":"Storstaden","country":"Sweden"},"email":"jens@jens.se","phone":"0701234567","shoeSize":42,"secretNuclearCode":"Qwerty1234!"}`
    );
  };

  const changePersonShoeSize = (person: Person): Person => {
    return { ...person, shoeSize: 44 };
  };

  const writePersonToPublicDatabase = (person: Person) => {
    console.log(person);
  };

  const noValidation = () => {
    const person: Person = getPersonInfo();
    const changedPerson = changePersonShoeSize(person);
    writePersonToPublicDatabase(changedPerson);
  };

  noValidation();
}

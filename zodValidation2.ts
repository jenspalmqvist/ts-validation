import { z } from "zod";

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

  const writePersonToPublicDatabase = (person: any) => {
    console.log(person);
  };

  const validation = () => {
    const person: Person = getPersonInfo();

    const stringSchema = z.string();
    const numberSchema = z.number();
    const booleanSchema = z.boolean();
    const literalSchema = z.enum(["User", "SuperUser ", "Admin"]);
    const addressSchema = z.object({
      street: z.string(),
    });

    const personSchema = z.object({
      name: z.string().min(2).max(30).startsWith("J"),
      age: z.number().positive(),
      address: addressSchema,
    });

    // Validerar nycklarna vi angett, skickar med övriga properties som finns på objektet
    const personSchemaPassthrough = z
      .object({
        name: z.string(),
        age: z.number(),
      })
      .passthrough();

    // Validerar nycklarna vi angett och ger felmeddelande om det finns övriga properties
    const personSchemaStrict = z
      .object({
        name: z.string(),
        age: z.number(),
      })
      .strict();

    const personArraySchema = z.array(personSchema);

    // Kastar ett fel om objektet inte stämmer med schemat
    const personResult = personSchema.parse(person);

    // safeParse gör så att programmet inte kraschar, utan ger oss ett resultat och data eller eeventuellt felmeddelande
    const safePersonResult = personSchema.safeParse(person);

    writePersonToPublicDatabase(personResult);
  };

  validation();
}

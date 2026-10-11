
class Key {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Мешканець увійшов у будинок");
    } else {
      console.log("Двері зачинені");
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key.getSignature() === key.getSignature()) {
      this.door = true;
      console.log("Двері відчинено");
    } else {
      console.log("Неправильний ключ");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>HW-42 TypeScript</h1>
  <h2>Будинок</h2>
  <p>✅ Двері відчинено</p>
  <p>✅ Мешканець увійшов у будинок</p>
`;

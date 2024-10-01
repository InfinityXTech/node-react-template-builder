import { useEffect, useState } from "react";

interface RegistryEntry {
  [name: string]: any;
}

interface Registry {
  register: (name: string, entry: any) => Registry;
  list: () => string[];
  get: (name: string) => any;
}

export const useRegistry = () => {
  const storage = window.localStorage.getItem('registry') ?? '{}';
  const registry = JSON.parse(storage);
  // const [registry, setRegistry] = useState<RegistryEntry>({});

  const register = (name: string, entry: any) => {
    if (!name) {
      throw new Error("You must provide a valid name for this entry.");
    }

    if (registry[name] !== undefined) {
      throw new Error(`'${name}' already registered`);
    }

    if (!entry) {
      throw new Error(`You must provide something to register as '${name}'`);
    }

    registry[name] = entry;
    // setRegistry(registry);
    window.localStorage.setItem('registry', JSON.stringify(registry));
  };

  const get = (name: string) => {
    if (!registry.hasOwnProperty(name)) {
      console.error(`No such entry '${name}'`);
    }
    return registry[name];
  };

  const list = () => Object.keys(registry);

  // useEffect(() => {
  //   setRegistry({
  //     register: (name: string, entry: any) => register(name, entry),
  //     list: () => list(),
  //     get: (name: string) => get(name),
  //   });
  // }, []);

  return {
    registry: {
      get,
      register,
      list
    }
  };
};

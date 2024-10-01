import React from "react";

const FormElementsEditor = (props: any) => {
  const [dynamic, setDynamic] = React.useState<any>(null);

  React.useEffect(() => {
    const loadDynamic = async () => {
      const x = await import("./form-elements-edit.tsx");
      setDynamic(() => x.default);
    };
    loadDynamic();

    // const x = await React.lazy(()=> lazyRetry(() => import('./form-elements-edit.tsx')))
    // setDynamic(() => x.default);

    // const d = React.lazy(async() => {
    //   const x = await import("./form-elements-edit.tsx");
    //   setDynamic(() => x.default);
    //   return x
    // });
  }, []);

  if (!dynamic) {
    return <div>Loading...</div>;
  }
  const Component = dynamic;
  return <Component {...props} />;
};

export default FormElementsEditor;

export function ContohComponent({ title }: { title: string }) {
  //make props biar bisa ganti data di titlenya  di page.tsx
  return (
    <div>
      <h1>Halo {title}</h1>
    </div>
  );
}

//contoh component yang ga make props
export function ContohComponent2() {
  return (
    <div>
      <h1>Ini Contoh Component 2</h1>
    </div>
  );
}

import {
  ContohComponent,
  ContohComponent2,
} from "@/components/contohcomponent";
//import component yang tadi dah di buat
export default function Home() {
  return (
    <div>
      <h1>Ini Home Page</h1>
      <ContohComponent title="Ini Props" />
      <ContohComponent2 />
    </div>
  );
}

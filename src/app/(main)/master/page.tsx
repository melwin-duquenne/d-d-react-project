import ListMonster from "@/app/component/master/Listmonster";
import SlateEditor from "@/app/component/master/SlateEditor";

export default function MasterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center backdrop-blur-md">
      <div className="w-1/2 h-screen">
      <SlateEditor />
      </div>
      <div className="w-1/2 h-screen">
        <ListMonster />
      </div>
    </div>
  );
}
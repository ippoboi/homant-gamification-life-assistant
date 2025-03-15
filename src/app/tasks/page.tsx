import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Tasks() {
  return (
    <div className="mx-auto ">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Hello, Dimitar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Here are your tasks for today. You can add new tasks, edit or
              delete existing ones.
            </p>
          </CardContent>
        </Card>
        <div className="flex w-full gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <p>Task 1</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Task 1</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Task 1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Backlog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <p>Task 1</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Task 1</p>
                </div>
                <div className="flex items-center gap-2">
                  <p>Task 1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <p>Goal 1</p>
              </div>
              <div className="flex items-center gap-2">
                <p>Goal 1</p>
              </div>
              <div className="flex items-center gap-2">
                <p>Goal 1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

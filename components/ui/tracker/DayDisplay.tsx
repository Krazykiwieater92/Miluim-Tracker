import GetDays from "@/app/[Actions]/GetDays";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

import DeletePeriod from "@/app/[Actions]/DeletePeriod";
import { Button } from "../button";
import { Trash2 } from "lucide-react";

export default async function DayDisplay() {
  const serviceRecords = await GetDays();

  return (
    <div className="space-y-4 w-full mt-6 max-w-4xl">
      <Card className="w-full bg-secondary border-secondary border text-foreground">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-foreground">
            Service Records
          </CardTitle>
          <CardDescription className="text-sm text-foreground">
            Previous miluim service
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceRecords?.map((record, index) => (
              <Card
                key={record._id || index}
                className="border p-2 rounded-md text-foreground bg-accent/30 font-semibold flex-col flex w-full"
              >
                <form action={DeletePeriod} className="self-end">
                  <input
                    type="hidden"
                    name="recordId"
                    value={record._id.toString()}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="p-2 h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    title="Delete service record"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </form>
                <h3>Title: {record.name}</h3>
                <p>Days: {record.totalDays}</p>
                <p>From: {new Date(record.startDate).toLocaleDateString()}</p>
                <p>To: {new Date(record.endDate).toLocaleDateString()}</p>
              </Card>
            )) || (
              <p className="font-bold text-foreground col-span-full text-center">
                No service records found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

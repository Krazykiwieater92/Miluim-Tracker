"use client";
import { useEffect, useState } from "react";
import { Button } from "../button";
import UploadToDb from "@/app/[Actions]/Upload";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "../switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, RotateCcwIcon, SendIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import Welcomer from "./welcomer";

export default function MiluimCounter() {
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [clearInput, setClearInput] = useState(false);
  const [noName, setNoName] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");

  const calculateDays = (
    start: Date | undefined,
    end: Date | undefined
  ): number => {
    if (!start || !end) return 0;
    if (end < start) return 0;

    const timeDifference = end.getTime() - start.getTime();
    const daysDifference =
      Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    return daysDifference;
  };

  useEffect(() => {
    const calculatedDays = calculateDays(startDate, endDate);
    setDays(calculatedDays);
  }, [startDate, endDate]);

  const handleClear = () => {
    setDays(0);
    setStartDate(new Date());
    setEndDate(new Date());
    setOpen(false);
    setClearInput(true);
  };

  //handle submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UploadToDb(new FormData(e.currentTarget));
      setSuccess("Data uploaded successfully.");
      setClearInput(true);
    } catch (error) {
      setError("Error uploading data.");
    } finally {
      setLoading(false);
      handleClear();
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-6 ">
     
      <Card className="w-full bg-primary border-primary border">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-secondary">
            <CalendarIcon className="h-6 w-6" />
            Miluim Service Tracker
          </CardTitle>
          <CardDescription className="text-sm text-secondary">
            Track your reserve military service periods
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Days Counter */}
          <div className="flex justify-center">
            <Card className="w-fit border-[#BF8D70] border-2 bg-accent/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Label className="text-sm text-secondary justify-center">
                    Total Days
                  </Label>
                  <div className="text-3xl font-bold text-secondary">
                    {calculateDays(startDate, endDate)}
                  </div>
                  <Badge variant={open ? "default" : "secondary"}>
                    {open ? "Active Service" : "Completed"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="startDate"
              value={startDate?.toISOString().split("T")[0] || ""}
            />
            <input
              type="hidden"
              name="endDate"
              value={endDate?.toISOString().split("T")[0] || ""}
            />
            <input type="hidden" name="open" value={open.toString()} />

            {/* Date Selection */}
            <div className="flex">
              <Label
                htmlFor="start-date"
                className="text-sm font-medium text-secondary mx-auto"
              >
                Start Date
              </Label>
              <Label
                htmlFor="end-date"
                className="text-sm font-medium text-secondary mx-auto"
              >
                End Date
              </Label>
            </div>
            <div className="flex flex-col md:flex-row md:gap-6 gap-4">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-md mx-auto"
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }}
              />

              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                className="rounded-md mx-auto"
                classNames={{
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }}
              />
            </div>

            <Separator />

            {/* Service Status */}
            <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/30 backdrop-blur">
              <div className="space-y-0.5">
                <Label className="text-sm text-secondary font-medium">
                  Service Status
                </Label>
                <div className="text-sm text-secondary">
                  Mark if this service period is currently active
                </div>
              </div>
              <Switch
                checked={open}
                onCheckedChange={setOpen}
                aria-label="Service status"
              />
            </div>

            <div className="flex flex-col items-center justify-between p-4 rounded-lg border backdrop-blur">
              <label className="mx-auto text-secondary ">
                Enter Service Period Title
              </label>
              <div className="inline-flex gap-4">
                <Label className="text-secondary mx-auto font-medium">
                  Enter Custom name
                </Label>

                <Switch
                  checked={noName}
                  onCheckedChange={setNoName}
                  aria-label="No Name"
                />
              </div>
              {noName ? (
                <input
                  className="rounded-lg border hover:bg-accent/30 backdrop-blur p-3 text-background w-[85%] mx-auto mt-3"
                  type="text"
                  name="name"
                  placeholder="Service Period Title"
                  autoComplete="off"
                />
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className=" text-background w-[50%] rounded-md mx-auto p-1 bg-accent/30 hover:bg-accent
            transition duration-100 hover:border-accent hover:text-background mt-3"
                      >
                        {selectedType || "Choose type"}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-70 bg-foreground/30 backdrop-blur text-background">
                      <DropdownMenuItem
                        onSelect={() => setSelectedType("Tzav 8")}
                      >
                        Tzav 8
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setSelectedType("Tzav 9")}
                      >
                        Tzav 9
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => setSelectedType("Training")}
                      >
                        Training
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Hidden input to pass the selected value to the form */}
                  <input type="hidden" name="name" value={selectedType} />
                </>
              )}
            </div>
            {/* Summary */}
            {startDate && endDate && (
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <Label className="text-xs text-foreground">FROM</Label>
                      <div className="font-medium">
                        {startDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-foreground">TO</Label>
                      <div className="font-medium">
                        {endDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-foreground">
                        DURATION
                      </Label>
                      <div className="font-medium">
                        {calculateDays(startDate, endDate)} days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                variant="outline"
                size="default"
                type="button"
                onClick={handleClear}
                className="flex items-center gap-2 bg-accent/30 hover:bg-accent text-secondary"
              >
                <RotateCcwIcon className="h-4 w-4" />
                Clear
              </Button>
              <Button
                size="default"
                type="submit"
                className="flex items-center gap-2 flex-1 bg-accent/30 hover:bg-accent "
                disabled={!startDate || !endDate || days === 0 || loading}
              >
                <SendIcon className="h-4 w-4" />
                {loading ? "Uploading..." : "Submit Service Record"}
              </Button>
            </div>
          </form>
          <div>
            {success && (
              <div className="text-secondary  text-sm mt-2 w-full border bg-green-500/30 backdrop-blur rounded-md p-1">
                <h2 className="ml-3">{success}</h2>
              </div>
            )}
            {error && (
              <div className="text-secondary  text-sm mt-2 w-full border bg-red-500/30 backdrop-blur rounded-md p-1">
                <h2 className="ml-3">{error}</h2>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

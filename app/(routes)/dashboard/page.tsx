import { fetchFormStats } from "@/actions/form.action";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import StatsCard from "./_components/StatsCard";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-6xl mx-auto md:px-0 pt-1">
        {/* Form Stats */}
        <section className="stats-section w-full">
          <div className="w-full flex items-center justify-between py-5">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <Button className="!bg-primary !font-medium gap-1">
              <PlusIcon />
              Create a form
            </Button>
          </div>
          <StatsListWrap />
        </section>

        <div className="mt-10">
          <Separator className="!border-[#eee] !bg-[#eee]" />
        </div>

        {/* {ALL FORM} */}

        <section className="w-full pt-7 pb-10">
          <div className="w-full flex items-center mb-4">
            <h5 className="text-xl font-semibold tracking-tight ">All Forms</h5>
          </div>

          <div className="flex items-center justify-center">
            No From created
          </div>
        </section>
      </div>
    </div>
  );
};

async function StatsListWrap() {
  const stats = await fetchFormStats();
  return <StatsCard loading={false} data={stats} />;
}

export default Dashboard;

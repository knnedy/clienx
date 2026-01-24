"use client";

import {
  ArrowRight,
  Plus,
  Eye,
  MessageCircle,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "./stat-card";
import ProjectCard from "./project-card";
import { useUserMode } from "../providers/user-mode-provider";

export default function EmployerContent() {
  const { mode } = useUserMode();

  return (
    <main className="flex-1 overflow-y-auto px-8 py-10 bg-background">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-5xl font-bold text-foreground tracking-tight">
              Welcome back, Sarah
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              Manage your team and discover talented freelancers.
            </p>
          </div>
          <Button
            size="lg"
            className="w-fit gap-2 text-white bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4" />
            Post a Job{" "}
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Active Projects"
            value="2"
            change="1 hiring"
            trend="stable"
            icon={Briefcase}
            userMode={mode}
          />
          <StatCard
            label="Total Spent"
            value="$4,250"
            change="+$800 this month"
            trend="up"
            icon={TrendingUp}
            userMode={mode}
          />
          <StatCard
            label="Messages"
            value="8"
            change="3 unread"
            trend="stable"
            icon={MessageCircle}
            userMode={mode}
          />
          <StatCard
            label="Avg Rating"
            value="4.8"
            change="12 reviews"
            trend="up"
            icon={Eye}
            userMode={mode}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              Your Job Posts
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage your open positions
            </p>
          </div>
          <Button
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProjectCard
            type="employer"
            title="Senior React Developer"
            description="Experienced React developer for 3-month contract"
            budget="$4,500/month"
            applicants="12"
            featured={true}
            userMode={mode}
          />
          <ProjectCard
            type="employer"
            title="UI/UX Designer"
            description="Design landing page and dashboard for SaaS"
            budget="$2,000"
            applicants="8"
            featured={false}
            userMode={mode}
          />
          <ProjectCard
            type="employer"
            title="DevOps Engineer"
            description="Setup CI/CD pipeline and cloud infrastructure"
            budget="$3,500"
            applicants="5"
            featured={false}
            userMode={mode}
          />
        </div>
      </div>
    </main>
  );
}

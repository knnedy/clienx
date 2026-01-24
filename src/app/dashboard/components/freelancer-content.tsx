"use client";

import {
  ArrowRight,
  Eye,
  MessageCircle,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "./stat-card";
import ProjectCard from "./project-card";
import { useUserMode } from "../providers/user-mode-provider";

export default function FreelancerContent() {
  const { mode } = useUserMode();

  return (
    <main className="flex-1 overflow-y-auto px-8 py-10 bg-background">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="space-y-3">
            <h2 className="text-5xl font-bold text-foreground tracking-tight">
              Welcome back, Alex
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl">
              Your dashboard is ready. Find your next opportunity below.
            </p>
          </div>
          <Button
            size="lg"
            className="w-fit gap-2 text-white bg-cyan-600 hover:bg-cyan-700">
            <Briefcase className="w-4 h-4" />
            Find Projects
          </Button>
        </div>
      </div>

      <div className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Active Proposals"
            value="3"
            change="+2 this week"
            trend="up"
            icon={Briefcase}
            userMode={mode}
          />
          <StatCard
            label="Profile Views"
            value="156"
            change="+24 today"
            trend="up"
            icon={Eye}
            userMode={mode}
          />
          <StatCard
            label="Messages"
            value="5"
            change="2 unread"
            trend="stable"
            icon={MessageCircle}
            userMode={mode}
          />
          <StatCard
            label="Completion Rate"
            value="98%"
            change="5 projects"
            trend="up"
            icon={TrendingUp}
            userMode={mode}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">
              Recommended Projects
            </h3>
            <p className="text-sm text-muted-foreground">
              Opportunities matched to your skills
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
            type="freelancer"
            title="E-Commerce Platform"
            client="TechStart Inc."
            budget="$2,500 - $3,500"
            timeframe="30 days"
            skills={["React", "Node.js", "MongoDB"]}
            applicants="24"
            userMode={mode}
          />
          <ProjectCard
            type="freelancer"
            title="Mobile App UI Design"
            client="Creative Studios"
            budget="$1,500 - $2,000"
            timeframe="14 days"
            skills={["Figma", "UI/UX", "Prototyping"]}
            applicants="18"
            userMode={mode}
          />
          <ProjectCard
            type="freelancer"
            title="Content Writing - Blog"
            client="Digital Co."
            budget="$800 - $1,200"
            timeframe="45 days"
            skills={["Writing", "SEO", "Content"]}
            applicants="12"
            userMode={mode}
          />
        </div>
      </div>
    </main>
  );
}

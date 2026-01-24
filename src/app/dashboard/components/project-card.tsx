"use client";

import { ArrowRight, Heart, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type UserMode = "freelancer" | "employer";
type ProjectType = "freelancer" | "employer";

interface ProjectCardProps {
  type: ProjectType;
  title: string;
  client?: string;
  budget: string;
  timeframe?: string;
  skills?: string[];
  applicants?: string;
  description?: string;
  featured?: boolean;
  userMode: UserMode;
}

export default function ProjectCard({
  type,
  title,
  client,
  budget,
  timeframe,
  skills,
  applicants,
  description,
  featured,
  userMode,
}: ProjectCardProps) {
  const accentColors = {
    freelancer: {
      featured: "border-cyan-500/40 bg-cyan-500/5 shadow-cyan-500/10",
      accent: "text-cyan-600 dark:text-cyan-400",
      badge:
        "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    },
    employer: {
      featured: "border-purple-500/40 bg-purple-500/5 shadow-purple-500/10",
      accent: "text-purple-600 dark:text-purple-400",
      badge:
        "bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30",
    },
  };

  const colors = accentColors[userMode];

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-200 cursor-pointer border-border/60 ${
        featured
          ? `border-2 ${colors.featured} shadow-lg`
          : "hover:border-accent/50 hover:shadow-md"
      }`}>
      <div className="relative p-6 space-y-5">
        {featured && (
          <Badge
            variant="secondary"
            className={`w-fit text-xs font-semibold uppercase tracking-wide ${colors.badge}`}>
            Featured
          </Badge>
        )}

        {type === "freelancer" ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <h4 className="font-semibold text-base text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                  {title}
                </h4>
                <p className="text-sm text-muted-foreground">{client}</p>
              </div>
              <Heart className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:fill-accent shrink-0 transition-all" />
            </div>

            <div className="border-t border-border/40 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-sm ${colors.accent}`}>
                  {budget}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {timeframe}
                </span>
              </div>

              {skills && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5" /> {applicants} applicants
                </span>
                <Button size="sm" className="h-8 gap-1 text-xs">
                  Apply
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <h4 className="font-semibold text-base text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                {title}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>

            <div className="border-t border-border/40 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-sm ${colors.accent}`}>
                  {budget}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                  <Users className="w-3.5 h-3.5" /> {applicants}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs hover:bg-secondary">
                  View Details
                </Button>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

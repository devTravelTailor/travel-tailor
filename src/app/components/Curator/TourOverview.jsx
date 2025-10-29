import { Card, CardContent } from "../../components/ui/card";
import { Clock, Users, Calendar, Globe } from "lucide-react";

function TourOverview({
  duration,
  groupSize,
  ageRange,
  languages,
  description,
  tagMonths = [],
}) {
  const stats = [
    {
      icon: Clock,
      label: "Duration",
      value: duration,
    },
    {
      icon: Users,
      label: "Group Size",
      value: groupSize,
    },
    {
      icon: Calendar,
      label: "Ages",
      value: ageRange,
    },
  ];

  return (
    <div className="space-y-6 flex flex-col gap-6 mb-6">
      {/* Clean stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border border-gray-100 text-center p-0   w-full"
          >
            <CardContent className="p-4">
              <stat.icon className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-sm text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div
                className="font-medium text-base"
                data-testid={`text-${stat.label
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Best Months Section */}
      {/* {tagMonths.length > 0 && (
        <div className='space-y-4'>
          <h3 className='text-xl font-[500] mb-3'>Best Times to Visit</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            {tagMonths.map((month, index) => (
              <Card
                key={index}
                className='border border-gray-100 text-center w-full p-0'>
                <CardContent className='p-3'>
                  <img
                    src={month.displayImg}
                    alt={month.highlight.title}
                    className='w-full h-15 object-cover rounded-lg mb-2'
                  />
                  <div
                    className='text-base font-base mb-1 capitalize'
                    data-testid={`month-${index}`}>
                    {month.month}
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    {month.highlight.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )} */}

      {/* Clean overview section */}
      <div>
        <h2 className="text-3xl font-bold mb-4">Tour Overview</h2>
        <p
          className="text-base text-muted-foreground leading-relaxed"
          data-testid="text-description"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default TourOverview;

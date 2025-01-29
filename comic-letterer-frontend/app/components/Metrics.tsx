import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Metrics() {
  // Mock data - replace with actual metrics
  const metrics = [
    { title: "Projects Completed", value: 25 },
    { title: "Pages Lettered", value: 1500 },
    { title: "Clients", value: 10 },
    { title: "Average Pages per Day", value: 5 },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{metric.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


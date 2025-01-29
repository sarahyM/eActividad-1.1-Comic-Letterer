import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function StyleGallery() {
  const [styles, setStyles] = useState([
    { id: 1, name: "Bold Superhero", imageUrl: "https://example.com/style1.jpg" },
    { id: 2, name: "Elegant Script", imageUrl: "https://example.com/style2.jpg" },
  ])
  const [newStyleName, setNewStyleName] = useState("")
  const [newStyleUrl, setNewStyleUrl] = useState("")

  const addStyle = () => {
    if (newStyleName && newStyleUrl) {
      setStyles([...styles, { id: Date.now(), name: newStyleName, imageUrl: newStyleUrl }])
      setNewStyleName("")
      setNewStyleUrl("")
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Style Gallery</h2>
      <div className="flex space-x-2">
        <Input value={newStyleName} onChange={(e) => setNewStyleName(e.target.value)} placeholder="Style name" />
        <Input value={newStyleUrl} onChange={(e) => setNewStyleUrl(e.target.value)} placeholder="Image URL" />
        <Button onClick={addStyle}>Add Style</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {styles.map((style) => (
          <Card key={style.id}>
            <CardHeader>
              <CardTitle>{style.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={style.imageUrl || "/placeholder.svg"} alt={style.name} className="w-full h-40 object-cover" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { User, Mail, FileText, Briefcase, Calendar } from "lucide-react"

interface Applicant {
  id: string
  name: string
  email: string
  bio: string
  resumeFile: File | null
  resumeName: string
  date: string
}

export default function JobApplicationPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!name || !email || !bio || !resumeFile) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Create new applicant
      const newApplicant: Applicant = {
        id: Date.now().toString(),
        name,
        email,
        bio,
        resumeFile,
        resumeName: resumeFile.name,
        date: new Date().toLocaleDateString(),
      }

      // Add to applicants list
      setApplicants([...applicants, newApplicant])

      // Reset form
      setName("")
      setEmail("")
      setBio("")
      setResumeFile(null)

      // Reset file input
      const fileInput = document.getElementById("resume") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Job Application Portal</h1>
          <p className="text-muted-foreground max-w-md">
            Submit your application and join our team of talented professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div className="lg:sticky lg:top-10 h-fit">
            <Card className="border-2 border-primary/10 shadow-lg">
              <CardHeader className="bg-primary/5 border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <span>Submit Your Application</span>
                  <Badge variant="outline" className="ml-auto">
                    New
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume" className="text-sm font-medium">
                      Resume
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-md p-4 transition-all duration-200 hover:border-primary/50 focus-within:border-primary/50">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setResumeFile(e.target.files[0])
                          }
                        }}
                        required
                        className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <p className="text-xs text-muted-foreground mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium">
                      Short Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself and your experience..."
                      className="min-h-[150px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Briefly describe your skills, experience, and why you're a good fit for the position.
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="bg-primary/5 border-t border-border/50 p-6">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full transition-all duration-200 hover:shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Recent Applicants</h2>
              {applicants.length > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {applicants.length} {applicants.length === 1 ? "Application" : "Applications"}
                </Badge>
              )}
            </div>

            {applicants.length === 0 ? (
              <Card className="border-2 border-dashed border-border/50 bg-background/50">
                <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                  <div className="rounded-full bg-secondary/50 p-3 mb-4">
                    <User className="h-6 w-6 text-secondary-foreground/70" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No applications yet</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Be the first to submit your application and join our team!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {applicants.map((applicant) => (
                  <Card
                    key={applicant.id}
                    className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20"
                  >
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <User className="h-7 w-7 text-primary" />
                          </div>
                          <div className="space-y-2 w-full">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-lg">{applicant.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                New
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="mr-2 h-4 w-4" />
                              {applicant.email}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <FileText className="mr-2 h-4 w-4" />
                              {applicant.resumeName}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-2 h-4 w-4" />
                              {applicant.date}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-sm">{applicant.bio}</p>
                        </div>
                      </div>
                      <div className="bg-secondary/20 px-6 py-3 flex justify-end">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, FileText } from "lucide-react"

interface Applicant {
  id: string
  name: string
  email: string
  bio: string
  resumeFile: File | null
  resumeName: string
}

export default function JobApplicationPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!name || !email || !bio || !resumeFile) {
      alert("Please fill in all fields")
      return
    }

    // Create new applicant
    const newApplicant: Applicant = {
      id: Date.now().toString(),
      name,
      email,
      bio,
      resumeFile,
      resumeName: resumeFile.name,
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
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Job Application Form</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume</Label>
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
                  />
                  <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself and your experience..."
                    className="min-h-[120px]"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Applicants</h2>

          {applicants.length === 0 ? (
            <div className="text-center p-10 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No applications submitted yet</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applicants.map((applicant) => (
                <Card key={applicant.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{applicant.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="mr-2 h-4 w-4" />
                          {applicant.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FileText className="mr-2 h-4 w-4" />
                          {applicant.resumeName}
                        </div>
                        <p className="text-sm mt-2">{applicant.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


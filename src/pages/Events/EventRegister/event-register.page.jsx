import RichTextEditor from "@/components/RichTextEditor/rich-text-editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import postService from "@/services/post.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputForm } from "./form.page";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function EventRegister() {
  const { id } = useParams();

  const [post, setPost] = useState(null);

  const registrationForm = [
    {
      name: "Full name",
      type: "string",
      description: "Used for identification",
    },
    {
      name: "Phone number",
      type: "string",
      description: "Used to contact you",
    },
    {
      name: "Will you be present at the Inauguration event?",
      type: "radio",
      content: ["Yes", "No", "Not sure yet"],
    },
  ];

  const zObject = {};
  registrationForm.map((item) => {
    switch (item.type) {
      case "string":
        zObject[item.name] = z
          .string()
          .describe(item.description ? item.description : "");
        break;
      case "radio":
        zObject[item.name] = z
          .enum(item.content)
          .describe(item.description ? item.description : "");
        break;
    }
  });

  const formSchema = z.object(zObject);

  console.log("Form schema: ", formSchema.shape);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function getPost() {
    const [ok, data] = await postService.getPost(id);
    if (ok) {
      setPost(data);
    }
  }

  function onSubmit(values) {
    console.log(values);
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <section className="forums-section">
      {post && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  <RichTextEditor
                    readOnly={true}
                    content={post.description}
                    onChange={() => {}}
                  />
                </CardDescription>
              </CardHeader>

              <CardContent style={{ padding: 0 }}>
                {registrationForm.map((item) => {
                  if (item.type === "radio")
                    return (
                      <FormField
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem>
                            <CardHeader className="border-t px-6 py-4">
                              <CardTitle>{item.name}</CardTitle>
                              <CardDescription>
                                {item.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <RadioGroup
                                required
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                {item.content.map((content) => (
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem
                                      value={content}
                                      id={content}
                                    />
                                    <Label htmlFor={content}>{content}</Label>
                                  </div>
                                ))}
                              </RadioGroup>

                              <FormMessage />
                            </CardContent>
                          </FormItem>
                        )}
                      />
                    );

                  return (
                    <FormField
                      control={form.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <CardHeader className="border-t px-6 py-4">
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>
                              {item.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Input
                              placeholder=""
                              style={{ marginBottom: "0.2rem" }}
                              {...field}
                            />

                            <FormMessage />
                          </CardContent>
                        </FormItem>
                      )}
                    />
                  );
                })}

                {/*<CardHeader className="border-t px-6 py-4">
                  <CardTitle>Full name</CardTitle>
                  <CardDescription>
                    Used to get you identification.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input required placeholder="Store Name" />
                </CardContent>

                <CardHeader className="border-t px-6 py-4">
                  <CardTitle>Phone number</CardTitle>
                  <CardDescription>Used to contact you.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input required placeholder="Store Name" />
                </CardContent>

                <CardHeader className="border-t px-6 py-4">
                  <CardTitle>
                    Will you be present at the Inauguration event?
                  </CardTitle>
                  <CardDescription>required*</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Yes, absolutely!</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">No, not really.</Label>
                    </div>
                  </RadioGroup>
                </CardContent>

                <CardHeader className="border-t px-6 py-4">
                  <CardTitle>How are you going to the event?</CardTitle>
                  <CardDescription>required*</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        required
                        value="option-one"
                        id="option-one"
                      />
                      <Label htmlFor="option-one">
                        My own car, carpooling...
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        required
                        value="option-two"
                        id="option-two"
                      />
                      <Label htmlFor="option-two">Bus from Roumieh</Label>
                    </div>
                  </RadioGroup>
                </CardContent>*/}
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button type="submit">Save</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}
    </section>
  );
}

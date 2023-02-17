import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import supabase from "../supabase/supabase";
import ImageUploader from "../components/ImageUploader";
import SimpleCard from "../components/SimpleCard";

function ForgotInfo() {
  const [username, setUsername] = useState<string>("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);
  const [usernameTouched, setUsernameTouched] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string>("");
  const [user, setUser] = useState(null);
  const [profilePhotoCropper, setProfilePhotoCropper] = useState(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const handleUsernameChange = async (username: string) => {
    setUsername(username);
    if (username.trim().length <= 4) {
      setUsernameError("Username must be at least 5 characters long");
      setUsernameAvailable(false);
      return;
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data.user);
      setUser(data.user);
    };
    fetchUser()
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      console.log("runnig");
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .ilike("username", username);
      console.log(data, error);
      if (error) {
        setUsernameError("Something went wrong");
        setUsernameAvailable(false);
        return;
      }
      if (data && data.length > 0) {
        setUsernameError("Username already taken");
        setUsernameAvailable(false);
        return;
      }
      setUsernameError("");
      setUsernameAvailable(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [username]);
  const handleSignUpClick = () =>{

  }
  return (

    <Flex
      minH={"100vh"}
      align={{ base: "start", md: "center" }}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <SimpleCard w="93%" mt="20px">
        <Stack spacing={4} w={"full"} p={6} my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Sign Up your account
          </Heading>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={username}
              onBlur={() => setUsernameTouched(true)}
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
            {usernameTouched && usernameError && (
              <FormHelperText color="red.500">{usernameError}</FormHelperText>
            )}
          </FormControl>
          <FormControl id="profile-photo" isRequired>
            <FormLabel>Profile Photo</FormLabel>
            <ImageUploader
              onChange={(value: any) => setProfilePhotoCropper(value)}
            />
          </FormControl>
          <HStack w={"100%"} justifyContent="space-between">
            <Button
              leftIcon={<ChevronLeftIcon />}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                handleSignUpClick();
                setSubmitLoading(true);
              }}
              isLoading={submitLoading}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              isDisabled={!usernameAvailable || !profilePhotoCropper}
            >
              Submit
            </Button>
          </HStack>
        </Stack>
      </SimpleCard>
    </Flex>
  );
}

export default ForgotInfo;

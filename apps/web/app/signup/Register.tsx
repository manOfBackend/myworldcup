"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

import { useAuth } from "../../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const toast = useToast();
  const router = useRouter();

  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async ({ email, password }) => {
            const isSuccess = await register(email, password);
            if (isSuccess) {
              toast({
                title: "회원가입 성공",
                status: "success",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => {
                  router.push("/chat");
                },
              });
            } else {
              toast({
                title: "회원가입 실패",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            }
          }}>
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="email">이메일</FormLabel>
                  <Field as={Input} id="email" name="email" type="email" variant="filled" />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password} width="full">
                  <FormLabel htmlFor="password">패스워드</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                    validate={(value: string) => {
                      let error;
                      if (value.length < 8) {
                        error = "패스워드는 8글자 이상이어야 합니다.";
                      }
                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full">
                  회원가입
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

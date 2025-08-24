# Minimum version of CMake
cmake_minimum_required(VERSION 3.10)

# Project name and language
project(HelloCPP VERSION 1.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Add executable
add_executable(hello hello.cpp)

# Optionally, add include directories if you have headers
# include_directories(include)



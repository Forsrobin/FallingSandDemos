cmake_minimum_required(VERSION 3.28)

project(fallingsand LANGUAGES CXX)
set(CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE ON)
set(CMAKE_CXX_STANDARD 20)

add_compile_definitions(
    $<$<CONFIG:Debug>:NDEBUG>
    SPDLOG_ACTIVE_LEVEL=$<IF:$<CONFIG:Debug>,SPDLOG_LEVEL_INFO,SPDLOG_LEVEL_WARN>
)

find_package(SFML REQUIRED)

add_executable(${PROJECT_NAME} src/main.cpp src/game_manager.cpp)


target_link_libraries(${PROJECT_NAME} sfml::sfml)
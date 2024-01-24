#ifndef GAME_MANAGER_HEADER
#define GAME_MANAGER_HEADER

#include <SFML/Graphics.hpp>
#include <vector>
#include <iostream>
#include <random>

#define WINDOW_WIDTH 800
#define WINDOW_HEIGHT 800

#define PIXEL_SIZE 5

#define COLS WINDOW_WIDTH / PIXEL_SIZE
#define ROWS WINDOW_HEIGHT / PIXEL_SIZE


class GameManager
{
private:
    int mouse_pressed = 0;
    int gameArray[COLS][ROWS];
    sf::RenderWindow *window = new sf::RenderWindow(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "My window");

public:
    GameManager();
    ~GameManager();

    // Draw related functions
    void drawPixel(int x, int y, sf::Color color);
    void clearArray();
    void printArray();

    void run();
    void draw();
    void update();
};

#endif
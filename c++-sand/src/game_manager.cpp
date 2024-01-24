// #include <SFML/Window.hpp>
#include "includes/game_manager.h"

GameManager::GameManager(/* args */)
{
    clearArray();
    window->setFramerateLimit(144);
}

GameManager::~GameManager()
{
}

void GameManager::run()
{
    sf::Clock clock;
    sf::Time t;
    int radius = 5;
    while (window->isOpen())
    {
        clock.restart().asSeconds();
        // check all the window's events that were triggered since the last iteration of the loop
        window->clear(sf::Color::Black);
        sf::Event event;
        while (window->pollEvent(event))
        {
            // "close requested" event: we close the window
            if (event.type == sf::Event::Closed)
                window->close();

            if (event.type == sf::Event::MouseButtonPressed)
            {
                // Check if the left mosue is clicked
                if (event.mouseButton.button == sf::Mouse::Left)
                {
                    mouse_pressed = 1;
                }
            }

            if (event.type == sf::Event::MouseButtonReleased)
            {
                mouse_pressed = 0;
            }

            if (mouse_pressed == 1)
            {
                sf::Vector2i mousePos = sf::Mouse::getPosition(*window);

                // Generate a circle around the mouse
                for (int i = -radius; i < radius; i++)
                {
                    for (int j = -radius; j < radius; j++)
                    {
                        if (i * i + j * j < radius * radius)
                        {
                            int x = mousePos.x / PIXEL_SIZE + i;
                            int y = mousePos.y / PIXEL_SIZE + j;
                            if (x >= 0 && x < ROWS && y >= 0 && y < COLS)
                            {
                                gameArray[x][y] = 1;
                            }
                        }
                    }
                }

                // int x = mousePos.x / PIXEL_SIZE;
                // int y = mousePos.y / PIXEL_SIZE;
                // gameArray[x][y] = 1;
            }
        }

        update();
        draw();
        window->display();
        t = clock.getElapsedTime();
    }
}

void GameManager::draw()
{
    for (int i = 0; i < ROWS; i++)
    {
        for (int j = 0; j < COLS; j++)
        {
            int pixel = gameArray[i][j];
            if (pixel != 0)
            {
                drawPixel(i, j, sf::Color::Yellow);
            }
        }
    }
}

void GameManager::update()
{
    int tmpArray[ROWS][COLS];
    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++)
            tmpArray[i][j] = 0;

    for (int i = 0; i < ROWS; i++)
    {
        for (int j = 0; j < COLS; j++)
        {
            int entity = gameArray[i][j];
            // Get a random number between 0 and 1
            int random = rand() % 2;
            if (random == 0)
            {
                random = -1;
            }

            if (entity == 0)
            {
                continue;
            }

            // GEt all the relevant entities
            int entity_below = gameArray[i][j + 1];

            int entity_below_left = -1;
            int entity_below_right = -1;

            // Make sure that all the entities are within the bounds of the array
            if (j + 1 >= COLS)
            {
                tmpArray[i][j] = entity;
                continue;
            }

            // If the entities diagonally below are within the bounds of the array
            if (i - random >= 0 && i - random < ROWS)
            {
                entity_below_left = gameArray[i - random][j + 1];
            }
            else if (i + random >= 0 && i + random < ROWS)
            {
                entity_below_right = gameArray[i + random][j + 1];
            }

            // Make all the checks
            if (entity_below == 0)
                tmpArray[i][j + 1] = entity;
            else if (entity_below_left == 0)
                tmpArray[i - random][j + 1] = entity;
            else if (entity_below_right == 0)
                tmpArray[i + random][j + 1] = entity;
            else
                tmpArray[i][j] = entity;
        }
    }

    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++)
            gameArray[i][j] = tmpArray[i][j];
}

// Print the givven array to the console
void GameManager::printArray()
{
    for (int i = 0; i < ROWS; ++i)
    {
        for (int j = 0; j < COLS; ++j)
        {
            std::cout << gameArray[i][j] << " ";
        }
        std::cout << std::endl;
    }
}

void GameManager::drawPixel(int x, int y, sf::Color color)
{
    sf::RectangleShape rectangle(sf::Vector2f(PIXEL_SIZE, PIXEL_SIZE));
    rectangle.setPosition(x * PIXEL_SIZE, y * PIXEL_SIZE);
    rectangle.setFillColor(color);
    window->draw(rectangle);
}

void GameManager::clearArray()
{
    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++)
            gameArray[i][j] = 0;
}
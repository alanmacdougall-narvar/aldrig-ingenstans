# handle resource routes for Dog model
class DogsController < ApplicationController
  TOKEN = ENV['API_KEY']

  def index
    dogs = Dog.all # TODO: paginate
    render json: dogs.as_json
  end

  def create
    # reject unless bearer token matches ENV['API_KEY']
    authenticate_or_request_with_http_token do |token|
      dog = Dog.new(
        name: params[:name],
        description: params[:description]
      )
      dog.save
      render json: dog.as_json
    end
  end

  def show
    dog = Dog.find_by(id: params[:id])
    render json: dog.as_json
  end

  def update
    authenticate_or_request_with_http_token do |token|
      dog = Dog.find_by(id: params[:id])
      dog.name = params[:name] || dog.name
      dog.description = params[:description] || dog.description
      dog.save
      render json: dog.as_json
    end
  end

  def destroy
    authenticate_or_request_with_http_token do |token|
      dog = Dog.find_by(id: params[:id])
      dog.destroy
      render json: { message: "Dog successfully destroyed. 🥲" }
    end
  end
end

# handle resource routes for Dog model
class DogsController < ApplicationController
  # ...but I generated with --api, so I don't know why CSRF challenges are still happening
  protect_from_forgery with: :null_session

  def index
    dogs = Dog.all # TODO: paginate
    byebug
    render json: dogs.as_json
  end

  def create
    # reject unless bearer token matches ENV['API_KEY']
    unless headers['Authorization'] == "Bearer #{ENV['API_KEY']}"
      render json: { message: 'Unauthorized' }, status: :unauthorized
      return
    end

    dog = Dog.new(
      name: params[:name],
      description: params[:description]
    )
    dog.save
    render json: dog.as_json
  end

  def show
    dog = Dog.find_by(id: params[:id])
    render json: dog.as_json
  end

  def update
    dog = Dog.find_by(id: params[:id])
    dog.name = params[:name] || dog.name
    dog.description = params[:description] || dog.description
    dog.save
    render json: dog.as_json
  end

  def destroy
    # reject unless bearer token matches ENV['API_KEY']
    unless headers['Authorization'] == "Bearer #{ENV['API_KEY']}"
      render json: { message: 'Unauthorized' }, status: :unauthorized
      return
    end

    dog = Dog.find_by(id: params[:id])
    dog.destroy
    render json: { message: "Dog successfully destroyed. 🥲" }
  end
end

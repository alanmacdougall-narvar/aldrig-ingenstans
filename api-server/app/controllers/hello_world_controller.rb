# demo controller that returns a JSON message
class HelloWorldController < ApplicationController
  def index
    render json: { message: 'Hello World!' }
  end
end
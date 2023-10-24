import React from "react";
import { render, screen, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    render(<Button {...defaultProps}>默认按钮</Button>)
    const element = screen.getByText('默认按钮') as HTMLButtonElement
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  })
  it('should render the correct component based on defferent props', () => {
    render(<Button {...testProps}>主要按钮</Button>)
    const element = screen.getByText('主要按钮')
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
  })
  it('should render a link when btnType equals link and href is provided', () => {
    render(<Button btnType='link' href="http://www.baidu.com">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    render(<Button {...disabledProps}>禁用按钮</Button>)
    const element = screen.getByText('禁用按钮') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
import { Expression } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  input: string = "0"
  result: string = "0"

  checkOperator() {
    if (this.input.endsWith("+") || this.input.endsWith("-") || this.input.endsWith("*") || this.input.endsWith("/")) {
      return true
    }
    return false
  }

  addNumber(number: string) {
    if (this.input == "0") {
      this.input = number
    } else if (this.input.slice(-1) == ")") {
      return
    } else {
      this.input = this.input + number
    }
  }

  clear() {
    this.input = "0"
    this.result = "0"
  }

  delete() {
    this.input = this.input.slice(0, -1)
  }

  addOperator(operator: string) {
    if (this.input.startsWith("0") || this.input.slice(-1) == ",") {
      return
    }
    if (this.checkOperator()) {
      this.input = this.input.slice(0, -1) + operator
    } else {
      this.input = this.input + operator
    }
  }
  addBracket() {
    let bracket = []
    if (this.input.startsWith("0")) {
      this.input = '('
      return
    }

    for (let i = 0; i < this.input.length; i++) {
      if (this.input[i] == ")") {
        bracket.push(this.input[i])
      } else if (this.input[i] == "(") {
        bracket.push(this.input[i])
      }
    }
    if (bracket.toString().endsWith("(")) {
      this.input = this.input + ")"
    } else {
      this.input = this.input + "("
    }
  }

  reverseInt() {
    if (this.input.startsWith("0")) {
      this.input = "(-"
    }
    if (this.input.includes("(-")) {
      this.input = this.input.replace('(-', "")
    } else {
      this.input = this.input + "(-"
    }
  }

  addComma() {
    if (this.checkOperator() || this.checkDecimal()) {
      return
    } else {
      this.input = this.input + "."
    }
  }

  checkDecimal() {
    const regex = /^[-+]?([0-9]+([.,][0-9]*)?|[.,][0-9]+)$/;
    if (this.input.slice(-1) === ".") {
      return true
    } else if (this.input.includes(".") && regex.test(this.input)) {
      return true
    } else {
      return false
    }
  }

  operatorBeforeBracket() {

  }

  calculate() {
    let result = eval(this.input)
    return this.result = result
  }
}
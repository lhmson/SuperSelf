import React, { Component } from "react";
import styled from "styled-components/native";
import Colors from "../utils/Colors";

const TextStyle = ({ ...props }) => {
  return <Text {...props}>{props.children}</Text>;
};

const Text = styled.Text`
  color: ${(props) => props.color ?? Colors.lightBlack};
  margin: ${(props) => props.margin ?? 0};
  padding: ${(props) => props.padding ?? 0};
  ${({ title, large, medium, small, tiny }) => {
    switch (true) {
      case title:
        return `font-size:32px;`;

      case large:
        return `font-size:24px;`;

      case medium:
        return `font-size:18px;`;

      case small:
        return `font-size:14px;`;

      case tiny:
        return `font-size:11px;`;

      default:
        return `font-size:15px;`;
    }
  }}

  ${({ light, thin, condense, bold }) => {
    switch (true) {
      case light:
        return `font-family: sans-serif-light;`;

      case thin:
        return `font-family: sans-serif-thin;`;

      case condense:
        return `font-family: sans-serif-condensed;`;

      case bold:
        return `font-family: sans-serif-medium;`;

      default:
        return `font-family: sans-serif;`;
    }
  }}

  ${({ center, right }) => {
    switch (true) {
      case center:
        return `text-align:center;`;

      case right:
        return `text-align:right;`;

      default:
        return `text-align:left;`;
    }
  }}
`;

export default TextStyle;

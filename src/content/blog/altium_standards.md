---
title: Altium Standards
publishDate: 2019-12-01 00:00:00
img: /src/assets/altium_logo.png
img_alt: Altium Designer
description: |
  Standards used for schematic capture, parts libraries, part footprints, drawing title blocks, 
tags:
  - Altium
  - EDA Tools
---
Standards are important for keeping a design unified. Here are a few standards I helped develop to produce consistent designs across many projects.

## Component Layer Pair Definitions

| **Top** | **Layer**   | **Bottom** |
| ------- | ----------- | ---------- |
| M5      | Assembly    | M6         |
| M13     | 3D Body     | M14        |
| M15     | Courtyard   | M16        |
| M17     | Drawing Ref | M18        |
| M9      | Coating     | M10        |
| M7      | Glue Points | M8         |
| M11     | THT Solder  | M12        |

## Mechanical Layer Definitions

| **Name**        | **Layer** |
| --------------- | --------- |
| Board Shape     | M20       |
| Drawing Ref     | M19       |
| Route Tool Path | M21       |
| V Cut           | M22       |

## Component Parameters

| **Name**                 | **Value**                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Value                    | Short description or passive value                                                                               |
| Mount                    | SMT - Surface Mount Tech  <br>THT - Through Hole Tech  <br>THR - Through Hole Reflow  <br>Virtual - Not soldered |
| Manufacturer Part Number |                                                                                                                  |
| Manufacturer             |                                                                                                                  |
| RoHs                     | Yes/No                                                                                                           |
| Aqueous Wash             | Yes/No                                                                                                           |
| Supplier 1               | Digi-key                                                                                                         |
| Supplier Part Number 1   |                                                                                                                  |
| Datasheet Link           |                                                                                                                  |
| Supplier Link 1          |                                                                                                                  |

## Passive Naming Convention for Design Item ID and Comment

| **Component Type** | **String**                                  | **Example**           |
| ------------------ | ------------------------------------------- | --------------------- |
| Resistor           | `R<SIZE>_<RESISTANCE>_<WATTS>_<TOLERANCE>`    | R0402_4K7R_1/4W_1%    |
| Capacitor          | `C<SIZE>_<CAPACITANCE>_<VOLTAGE>_<TEMP>`      | C0603_10uF_12V_X7R    |
| Cap Polarized      | `CP<SIZE>_<CAPACITANCE>_<VOLTAGE>_<TEMP>`     | CP1206_470uF_3V3_X7R  |
| Inductor           | `L<SIZE>_<INDUCTANCE>_<CURRENT>_<RESISTANCE>` | L4x4_2.2uH_3.25A_61mR |
| Ferrite Bead       | `FB<SIZE>_<POWER>@<RESISTANCE_FREQ>`          | FB0805_2A_150R        |

## Custom Project Parameters

| **Name**         | **Value**              |
| ---------------- | ---------------------- |
| CustomerAddress1 | Street Address         |
| CustomerAddress2 | City, State Zip        |
| CustomerName     | Company Name           |
| CustomerPhone    | Phone                  |
| CustomerWebsite  | `www.companyname.com`    |
| ProjectID        | CUST-PROJ              |
| ProjectRev       | 1.A.0                  |
| ProjectTitle     | Project Name           |

## Schematic Fonts

| **Type**   | **Font** | **Size** | **Color** |
| ---------- | -------- | -------- | --------- |
| Parameter  | Arial    | 10       | #000080   |
| Comment    | Arial    | 10       | #000080   |
| Designator | Arial    | 10       | #000080   |
| Pin        | Arial    | 8        | #000000   |
| Net Label  | Arial    | 8        | #800000   |

## Special Parameters

| **Name**         | **Value** | **Description**                  |
| ---------------- | --------- | -------------------------------- |
| System           | Connector | Defines multi-board connection   |
| Mating Connector | MPN       | Opposite gender of the connector |

## File Based Libraries

There are a few file based libraries that are used because you can not add an arbitrary supplier link to a managed component. These should be loaded for the Altium install level in Preferences->Data Management->File Based Libraries.

## Thermal Vias in QFN Parts

IPC-7093A

![](/src/assets/solder_mask_defined_pad.png)

Vary from IPC to have .3mm holes for cheaper PCB fab. When drawing the mask regions in Altium start with 0.5mm Dia and 0.3mm Hole vias with 0.2mm solder mask expansion with the from hole box checked. Draw .15mm lines to connect vias. Put View Configuration into Draft mode and use lines as reference. After regions are drawn, remove lines and change via mask expansion to 0.05mm from hole edge.

## Connector Gender

Male header pins are designated by a 30mil radius circle

Female sockets are designated by a 60mil square

Stackable male/female headers are a circle within a square

## Standard Vias

| **Type**  | **Via Diameter/Pad** | **Via Hole** | **Current @20°C Rise** |
| --------- | -------------------- | ------------ | ---------------------- |
| Minimum   | 0.55mm/22mil         | 0.3mm/12mil  | 1.9785 A               |
| Maximum   | 48mil                | 24mil        | 3.1851 A               |
| Preferred | 29mil                | 13mil        | 2.2755 A               |

## Fab and Assembly Panels

| **Fab Panel Size**                   | **2 Layer Handling Margin 1/2 in.** | **Multilayer Margin 1 in.**   |
| ------------------------------------ | ----------------------------------- | ----------------------------- |
| Full 24 x 18 (609.6 mm x 457.2 mm)   | 23 x 17 (584.2 mm x 431.8 mm)       | 22 x 16 (558.8 mm x 406.4 mm) |
| Half 12 x 18 (304.8 mm x 457.2 mm)   | 11 x 17 (279.4 mm x 431.8 mm)       | 10 x 16 (254 mm x 406.4 mm)   |
| Half 24 x 9 (609.6 mm x 228.6 mm)    | 23 x 8 (584.2 mm x 203.2 mm)        | 22 x 7 (558.8 mm x 177.8 mm)  |
| Quarter 12 x 9 (304.8 mm x 228.6 mm) | 11 x 8 (279.4 mm x 203.2 mm)        | 10 x 7 (254 mm x 177.8 mm)    |

### Stencil Machine

Max size: 16.5” x 20.5” (420 mm x 520 mm)

### Neoden8 Pick an Place

Max board size w/IC tray removed:

Max board size w/IC tray: 180 mm

Minimum board size: 48 mm
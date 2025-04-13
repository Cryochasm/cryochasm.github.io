---
title: KiCad Standards
publishDate: 2019-12-01 00:00:00
img: /src/assets/kicad_logo_small.png
img_alt: KiCad Logo
description: |
  Standards I used for my KiCad projects
tags:
  - EDA
  - Hardware
  - Standards
---
# KiCad-eeschema
## Goals
   * Portability
   * Clarity
   * Usability
   * Check for Errors

## Setup
***IMPORTANT*** After a clean install of KiCad set the following preference. If
this isn't done it can cause a conflict after adding new parts to an existing 
schematic.

*Preferences->Schematic Editor Options->Default Fields* add:

|Number |Name           |Default Value  |Visible    |
|:-----:|---------------|---------------|-----------|
|   1   |MPN            |?              |No         |
|   2   |Description    |?              |No         |
|   3   |Config         |"Fit"          |No         |

**MPN:** Manufacturer Part Number. If you type this into Octopart it should
bring up the part with multiple distributors.

**Description:** This is the long description from Digi-Key, or it has enough
information to respec the part if the original becomes obsolete or 
non-stock. Remove all "," in the description to not confuse the xml parsers
for the BOM generation.

**Config:** The *fit_field* field for the KiBoM plugin. The default `""` will
put the part into the BOM. Placing a `dnf`, `do not fit`, or `no stuff` will
remove it from the BOM. You can do different BOMs per configuration by using 
this field, such as "Development" or "Production", see the KiBoM documentation 
for more information. If the value is anything other than `Fit`, make the 
`Config` field visible. 

## Schematic Capture
* Place parts on 100 mil grid.
* Connect parts on 100/50 mil grid.
* Place text on 25 mil grid.

Rotate Local Net Names to be on the end of wires.
Ground and Power Net Names are Vertical.
Signal Names are Horizontal.

No Global Labels - Use Hierarchical Pins and Local Labels to make each sheet
portable.

Hierarchical Pins tied to Local Local placed on the left side of the sheet

Hierarchical Busses need to be double named with Local Labels, first with
the homogeneous bus label, next with the local. Adding `~~` as a prefix will
cause the netlist to always be named the local label, which can help when 
running traces on the PCB. (Nets will be named SDA instead of I2C0).
*Example:*  
~~~
    ~~POWER[0..2]<-|
                   |\_~~POWER0__GND
                   |\_~~POWER1__3V3
                   |\_~~POWER2__5V
~~~

Source parts as they are placed into the schematic & fill out the fields for
Datasheet, MPN, and Description on each part. For parts that do not have a
MPN (Mounting Holes, Spark Gaps, ect) put "-" in all three fields. This will
make it easy find missing information by searching for "?" in the generated
BOMs or searching the .sch files with a text editor. Make an effort to
reduce the number of line items on the bill of materials.

Do not connect more than 3 wires at a junction point.

Inputs on the Left, Outputs on the Right. Circuits should flow Left-to-Right
and then Top-to-Bottom.

Test Points - Should have enough points to unit test each IC. Test points on
every communication data line.

# KiCad-PCBnew

## Design Rules
### Global Track Width
|Inches       | Metric      | Notes                    |
|-------------|-------------|--------------------------|
| 7.874 mil~  |   0.20  mm  |Front and Back Layers Only|
| 9.84  mil~  |   0.25  mm  |Internal Layers           |
| 10    mil   |   0.254 mm~ |                          |
| 11    mil   |   0.279 mm~ | Hobby PCB Fab            |

### Track Clearance
|Inches       | Metric   |
|-------------|----------|
| 9.84 mil    |   0.25 mm|

### Differential Pairs (See TI Doc SPRAAR7F) Prefer 0402 SMD, 0603 Maximum
|Inches     |Metric    |Notes                |
|-----------|----------|---------------------|
|   6 mil   | 0.152 mm~| Trace Width         |
|   8 mil   | 0.203 mm~| Between Pair        |
|   30 mil  | 0.762 mm | General Keepout     |
|   50 mil  | 1.27  mm | High-Speed/Periodic | 

### Vias
|Inches      |Metric     |Notes              |
|------------|-----------|-------------------|
| 15.75 mil~ | 0.4 mm    | Via Dia           |
| 11.81 mil~ | 0.3 mm    | Drill             |
| 27 mil     | 0.686 mm~ |Via Dia **Default**|
| 17 mil     | 0.432 mm~ |Drill   **Default**|

### Lowest Common Denominator Drill Sizes
|Inches       |Metric      |Notes                                  |
|-------------|------------|---------------------------------------|
| 8     mil   |   0.203 mm~| Minimum before Micro Via              |
| 11.81 mil~  |   0.3   mm | Thermal Vias under Exposed Pads       |
| 17    mil   |   0.432 mm~| Default Via Drill                     |
| 23.6  mil~  |   0.6   mm |                                       |
| 35.4  mil~  |   0.9   mm |                                       |
| 40    mil   |   1.016 mm~| 25 mil Square Pin for 100 mil headers |
| 47.2  mil~  |   1.2   mm |                                       |
| 59.1  mil~  |   1.5   mm |                                       |

### Copper Zones/Fills/Pours
  * Outer Clearance: 25   mil |   0.635 mm
  * Minimum Width: 0.200 mm
  * Thermal Reliefs
    * Antipad Clearence: 0.508 mm
    * Spoke Width: 0.508 mm

### Board Thickness
|Inches         |Metric      |
|---------------|------------|
| 62 mil        |   1.57 mm~ |
| 62.99 mil~    |   1.6 mm   |

### Copper Layer
|Oz Cu | Inches  |Metric     | Notes       |
|------|---------|-----------|-------------|
| 1 oz | 1.4 mil | 0.036 mm~ | track depth | 

### Trace Current Capacity
**20 C** Max Temperature Rise

### Mounting Holes
* M2.5
* M3

### Silk Screen
|Inches |Metric      |Notes          |
|-------|------------|---------------|
|6 mil  | 0.152 mm~  | Minimum Width |

# KiCad-Generate-Production-Files

## Schematic
1. File->Page Settings: Update the Revision Number and Date.
2. Update the revision number on the PCB label.
3. generate netlist.
4. generate BOM using KiBoM.
5. move [project_name]_BOM.csv to `\fabrication\` folder.
6. Plot schematics to full color PDF, save to `\fabrication\` folder.

## PCB Layout
1. File->Page Settings: Update the Revision Number and Date.
2. Import netlist.
3. Update the `fabrication_scecifications` footprint.
4. Press 'B' to rebuild-copper pours.
5. Run DRC.
6. Plot gerbers.

![plot-gerbers.png](/src/assets/plot-gerbers.png "Plot Gerbers Dialog Box")

7. Plot Drill files.

![plot-drill-files.png](/src/assets/plot-drill-files.png "Plot Drill Files Box")

  - Click `Drill File`
  - Click `Map File`
8. File->Fabrication Outputs->Footprint Position (.pos) File

![pick-and-place.png](/src/assets/pick-and-place.png "Pick and Place")

9. File->Fabrication Outputs->IPC-D356 Netlist File
  - Save to `\gerbers\`
10. File->Print. Print to CutePDF Writer
  - Front Layer
    * F.Silk
    * F.Paste
    * Edge.Cuts
    * F.Fab
    * No Mirror
    * Single Page
    * Save to `\fabrication\` and rename to [project_name]-front-fabrication.pdf
  - Back Layer
    * B.Silk
    * B.Paste
    * Edge.Cuts
    * B.Fab
    * Mirror
    * Single Page
    * Save to `\fabrication\` and rename to [project_name]-back-fabrication.pdf

## Zip
1. Zip the \fabrication and \gerbers folders.
2. Rename the zip file to [project_name]_[Rev].zip


# KiCad-Footprint-Library

[KiCad Library Convention](https://github.com/KiCad/kicad-library/wiki/Kicad-Library-Convention)

*Through Hole Parts*
[IPC Standards for through hole parts](http://www.ipc.org/committee/drafts/1-13_d_7251WD1.pdf)

IPC-7351 Pin Standard
The part is oriented so that Pin 1 is on the top left of the part

Pin 1 is the cathode on diodes:
~~~
       | /|
    1__|/ |__2
       |\ |
       | \|
~~~
Pin 1 is the positive pole on Tantalum/Electrolytic capacitors:
~~~
       | |
    1__| |__2
      +| |  
       | |
~~~
*On the footprints Tantalum Capacitors have the positive pole marked, 
but Electrolytic Capacitors have the negative pole marked.*

## Use of Aliases    
exerpt from the kicadlibrarian documentation:  

> An error to avoid, for example, are the footprints “SOT23EBC”, “SOT23 INV”
> and “SOT23-SPECIAL” in the default library of KiCad: each of these is the
> SOT23 foot-print, but with various permutations of the pin numbers. Expect
> confusion, when the pin numbers in a components data sheet no longer match
> the pin numbers in the design... The recommended procedure is to create
> multiple schematic symbols, like “NPN-BEC” and “ NPN-EBC ”, and map both of
> these to a single SOT23 footprint. The difference in pin labelling is then
> recorded in the schematic symbols —and it will match the data sheets for the
> components. In your schematic, you are unlikely to have components marked as
> NPN-EBC; instead, you will specify a particular type of transistor, such as
> “BC817”. You can map BC817 to NPN-EBC by adding an alias. With aliases
> properly set up, you can add a BC817 to your schematic, to get the
> appropriate shape and pin numbering, which in turn maps correctly to the
> single SOT23 footprint.


## Clearances on 0.050mm Pitch Parts
| | | 
| ------------------------------- | ------- | 
| **Pad clearance**               | 0.14mm  | 
| **Solder mask clearance**       | 0.07 mm |
| **Solder paste clearance**      | 0.03 mm |
| **Solder paste ratio clearance**| -5.00%  |

# KiCad-Schematic-Library

*References*
https://github.com/KiCad/kicad-library/wiki/Kicad-Library-Convention
https://www.noao.edu/ets/Mechanical/Policies/ANSI%20Y32.2-1975.pdf

All Pins must fall on 100 mil grid.
Default Text size is 50 mil.

Always show pin numbers when polarity matters, this makes checking the
footprints much easier.

Parts that could have a Thermal Pad should have a pin with a pin number of
<EP> and pin name of <EP> for exposed pad.

Passive Parts should have pin 1 on (-0.1,0) and pin 2 on (0.1,0). When
Polarity matters Pin 1 Should be Positive and pin 2 should be negative. The
part should fit in a 0.1,0.05 to -0.1,-0.05 box at the maximum. This will
allow any passive part to be substituted for another without having to
redraw any of the connections. Pin number height should be changed to 0 when
polarity doesn't matter. Pins type should be set to Passive.

## IPC-7351 Pin Standard
The part is oriented so that Pin 1 is on the top left of the part

Pin 1 is the cathode on diodes:
~~~
       | /|
    1__|/ |__2
       |\ |
       | \|
~~~
Pin 1 is the positive pole on Tantalum/Electrolytic capacitors:
~~~
       | |
    1__| |__2
      +| |  
       | |
~~~
*On the footprints Tantalum Capacitors have the positive pole marked, 
but Electrolytic Capacitors have the negative pole marked.*

## Use of Aliases    
exerpt from the kicadlibrarian documentation:  

> An error to avoid, for example, are the footprints “SOT23EBC”, “SOT23 INV”
> and “SOT23-SPECIAL” in the default library of KiCad: each of these is the
> SOT23 foot-print, but with various permutations of the pin numbers. Expect
> confusion, when the pin numbers in a components data sheet no longer match
> the pin numbers in the design... The recommended procedure is to create
> multiple schematic symbols, like “NPN-BEC” and “ NPN-EBC ”, and map both of
> these to a single SOT23 footprint. The difference in pin labelling is then
> recorded in the schematic symbols —and it will match the data sheets for the
> components. In your schematic, you are unlikely to have components marked as
> NPN-EBC; instead, you will specify a particular type of transistor, such as
> “BC817”. You can map BC817 to NPN-EBC by adding an alias. With aliases
> properly set up, you can add a BC817 to your schematic, to get the
> appropriate shape and pin numbering, which in turn maps correctly to the
> single SOT23 footprint.

